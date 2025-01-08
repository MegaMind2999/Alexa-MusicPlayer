const AppError = require('../utils/AppError')
const CatchAsync = require('../utils/CatchAsync')
const Playlist = require('../model/playlist');
const User = require('../model/user');
const mongoose = require('mongoose');


const createplaylist = CatchAsync(async (req, res) => {
    const { userId , name } = req.body; // Get user ID from request parameters
    try {
        // Check if the playlist name already exists for the user
        const curruser = await User.findById(userId)
        const existingPlaylist = await (await curruser.populate('playlists')).playlists.find(playlist=> playlist.name === name);
        console.log(existingPlaylist);
        if (existingPlaylist) {
            return res.status(400).json({ message: 'Playlist name already exists for this user.' });
        }
        const newPlaylist = new Playlist({
        name: name,
        });
        await newPlaylist.save();

        await curruser.playlists.push(newPlaylist._id);

        await curruser.save();

        res.status(201).json(newPlaylist); // Respond with the created playlist
    } catch (error) {
        console.error('Error creating playlist:', error);
        res.status(500).json({ message: 'An error occurred while creating the playlist.' });
    }
});

const deletePlaylist = CatchAsync(async (req, res) => {
    const { userId, name } = req.body; // Get user ID and playlist name from request body

    try {
        // Find the user by ID and populate their playlists
        const currUser = await User.findById(userId).populate('playlists');

        if (!currUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Find the playlist by name
        const playlistToDelete = currUser.playlists.find(playlist => playlist.name === name);

        if (!playlistToDelete) {
            return res.status(404).json({ message: 'Playlist not found for this user.' });
        }

        // Remove the playlist from the user's playlists array
        currUser.playlists = currUser.playlists.filter(
            playlist => playlist._id.toString() !== playlistToDelete._id.toString()
        );

        // Save the updated user document
        await currUser.save();
        console.log(playlistToDelete._id);
        // Delete the playlist document from the database
        await Playlist.findByIdAndDelete(playlistToDelete._id.toString());

        res.status(200).json({ message: 'Playlist deleted successfully.' });
    } catch (error) {
        console.error('Error deleting playlist:', error);
        res.status(500).json({ message: 'An error occurred while deleting the playlist.' });
    }
});


const insertInto = CatchAsync(async (req, res) => {
    const { playlistId, songId } = req.body; // Get playlist ID and song ID from the request body

    try {
        // Find the playlist by its ID
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found.' });
        }

        // Check if the song already exists in the playlist
        const songExists = playlist.songs.some(
            song => song.toString() === songId.toString()
        );

        if (songExists) {
            return res.status(400).json({ message: 'Song is already in the playlist.' });
        }

        // Add the song ID to the playlist's songs array
        playlist.songs.push(songId);

        // Save the updated playlist
        await playlist.save();

        res.status(200).json({ message: 'Song added to playlist successfully.', playlist });
    } catch (error) {
        console.error('Error adding song to playlist:', error);
        res.status(500).json({ message: 'An error occurred while adding the song to the playlist.' });
    }
});

const getAll = CatchAsync(async (req, res) => {
    const { userId } = req.query; // Get user ID from request parameter

    try {
        // Find the user by ID and populate their playlists
        const user = await User.findById(userId).populate({
            path: 'playlists',
            populate: { path: 'songs' } // Populate the songs in each playlist
        });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // If the user has no playlists, return an empty array
        if (!user.playlists.length) {
            return res.status(200).json([]);
        }

        res.status(200).json(user.playlists); // Respond with the user's playlists
    } catch (error) {
        console.error('Error fetching playlists for user:', error);
        res.status(500).json({ message: 'An error occurred while fetching playlists.' });
    }
});

const deleteSongFromPlaylist = CatchAsync(async (req, res) => {
    const { playlistId, songId } = req.body; // Get playlist ID and song ID from request body

    try {
        // Find the playlist by ID
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found.' });
        }

        // Check if the song exists in the playlist
        const songIndex = playlist.songs.findIndex(song => song.toString() === songId.toString());

        if (songIndex === -1) {
            return res.status(404).json({ message: 'Song not found in the playlist.' });
        }

        // Remove the song from the playlist's songs array
        playlist.songs.splice(songIndex, 1);

        // Save the updated playlist
        await playlist.save();

        res.status(200).json({ message: 'Song deleted from playlist successfully.', playlist });
    } catch (error) {
        console.error('Error deleting song from playlist:', error);
        res.status(500).json({ message: 'An error occurred while deleting the song from the playlist.' });
    }
});

const updatePlaylist = CatchAsync(async (req, res) => {
    const { playlistId, songs } = req.body; // Expect playlistId and the new songs array in the request body

    try {
        // Find the playlist by ID
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found.' });
        }

        // Update the playlist's songs array with the new songs from the request
        playlist.songs = songs;

        // Save the updated playlist to the database
        await playlist.save();

        res.status(200).json({ message: 'Playlist updated successfully.', playlist });
    } catch (error) {
        console.error('Error updating playlist:', error);
        res.status(500).json({ message: 'An error occurred while updating the playlist.' });
    }
});




module.exports = {
    createplaylist ,
    deletePlaylist ,
    insertInto ,
    getAll,
    deleteSongFromPlaylist ,
    updatePlaylist,
};