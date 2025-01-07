const AppError = require('../utils/AppError')
const CatchAsync = require('../utils/CatchAsync')
const Song = require('../model/song');
const jsmediatags = require('jsmediatags');
const fs = require('fs');
const path = require('path');
const mm = require('music-metadata');
const { getAudioDurationInSeconds } = require('get-audio-duration');

const createSong = CatchAsync(async (req, res, next) => {
  if (!req.files || !req.files.audioFile) {
      return next(new AppError('Audio file is required', 400));
  }
  var coverImage = "default.png";
  const audioFilePath = req.files.audioFile[0].path; // Get the path of the uploaded audio file
  console.log('Audio File Path:', audioFilePath); // Log the file path for debugging
  const durationInSeconds = await getAudioDurationInSeconds(audioFilePath);
  const duration = `${Math.floor(durationInSeconds / 60)}:${Math.floor(durationInSeconds % 60).toString().padStart(2, '0')}`;
  jsmediatags.read(audioFilePath, {
      onSuccess: (tag) => {
        if (tag.tags.picture) {
          const picture = tag.tags.picture;
          console.log(picture);

          // Prepare the cover image file name and path
          const coverImageFileName = path.basename(audioFilePath, path.extname(audioFilePath)) + '-cover.' + picture.format.split('/')[1]; // e.g., "song-cover.jpg"
          const coverImagePath = path.join("uploads", coverImageFileName); // Save to the current directory
          coverImage = coverImageFileName;
          const coverImageBuffer = Buffer.from(picture.data);
          // Write the cover image to a file
          fs.writeFile(coverImagePath, coverImageBuffer, (err) => {
              if (err) {
                  console.error('Error saving cover image:', err);
                  coverImage = "default.png";
              }
              console.log('Cover image saved to', coverImagePath);
          });
      } else {
          console.log('No cover image found in the audio file.');
          

      }
          const newSong = new Song({
              title: tag.tags.title || 'Unknown Title',
              artist: tag.tags.artist || 'Unknown Artist',
              album: tag.tags.album || 'Unknown Album',
              duration: duration, 
              genre: tag.tags.genre ? tag.tags.genre : 'Unknown Genre',
              lyrics: '',
              audioFile: path.basename(audioFilePath),
              coverImage: coverImage
          });

          newSong.save()
              .then(() => {
                  res.status(201).json({
                      success: true,
                      newSong
                  });
              })
              .catch((err) => {
                console.log(err);
                  return next(new AppError('Failed to save song', 500));
              });
      },
      onError: (error) => {
          console.error('Error extracting metadata:', error);
          return next(new AppError('Failed to extract metadata from audio file', 500));
      }
  });
});
const getAllSongs =CatchAsync(async (req, res) => {
  const filterQuery = req.query.search;

  const filter = filterQuery 
      ? {
          $or: [
              { title: { $regex: filterQuery, $options: "i" } },
              { album: { $regex: filterQuery, $options: "i" } },
              { artist: { $regex: filterQuery, $options: "i" } }
          ]
      } 
      : {};

   // Use aggregate with $match and $sample to shuffle and limit to 50 results
   const songs = await Song.aggregate([
    { $match: filter },
    { $sample: { size: 50 } }
]);
    res.status(200).json({
        success : true,
        songs
    });
});

const getSongById = CatchAsync(async (req, res) => {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.status(200).json({
        success : true,
        song
    });
});

module.exports = {
  createSong,
  getAllSongs,
  getSongById,
};

