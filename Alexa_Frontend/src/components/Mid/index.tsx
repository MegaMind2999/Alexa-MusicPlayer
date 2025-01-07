import Queue_element from "./componants/Queue_element.tsx";
import Song from "../../models/song.tsx";
import Discover_element from "./componants/Discover_element.tsx";
import Playlist_element from "./componants/Playlist_element.tsx";
import { useEffect, useState } from "react";
import Playlist from "../../models/playlist.tsx";
import { useLocalStorage } from "../../hooks/useLocalStorage.tsx";
import axios from "axios";
import API_ENDPOINTS from "../../config.tsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FloatingDiv from "../Floating/index.tsx";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Mid = ({
  songs,
  queue,
  setQueue,
  handlePlayOne,
  queuechange,
  setqueuechange,
}: any) => {
  const [playlists, setplaylists] = useState<Playlist[]>([]);
  const [user, _setUser] = useLocalStorage("user", null);
  const [refresh, setRefresh] = useState(false);
  const [editMode, seteditMode] = useState(false);
  const [editingplaylist, seteditingplaylist] = useState<Playlist>();
  const [playlistName, setPlaylistName] = useState("");
  const userid = user._id;
  const token = user.token;
  const onDragEnd = (result: any) => {
    if (!result.destination) return; // Dropped outside the list

    const updatedQueue = Array.from(queue);
    const [movedItem] = updatedQueue.splice(result.source.index, 1); // Remove the item from its original position
    updatedQueue.splice(result.destination.index, 0, movedItem); // Add it to the new position

    // Update the queue state with the new order
    setQueue(updatedQueue);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_ENDPOINTS.GET_PLAYLISTS}/getall`,
          {
            headers: {
              Authorization: `${token}`, // Set the token in the Authorization header
            },
            params: { userId: userid }, // Include query parameters
            withCredentials: true,
          }
        );
        setplaylists(response.data); // Set the fetched data to state
      } catch (err: any) {
        console.log(err); // Set error message if the request fails
      }
    };

    fetchData();
  }, [refresh]);

  const addToQueue = (song: any) => {
    setQueue((queue: Array<any>) => {
      var songExists = queue.some((queuedSong) => queuedSong.id === song.id);
      if (songExists) {
        toast.warning("Song already in the queue", {
          position: "top-right", // Use the string directly instead of accessing POSITION
          autoClose: 1500, // Duration in milliseconds
        });
        return queue;
      }
      return [...queue, song];
    });
  };
  const removeFromQueue = (queue: Array<Song>, index: number) => {
    // Check if the index is within the bounds of the array
    if (index >= 0 && index < queue.length) {
      const arr = [...queue];
      arr.splice(index, 1);
      setQueue(arr);
    } else {
      console.log("Index out of bounds");
    }
  };
  const playlistplay = (playlist: Playlist) => {
    setQueue(playlist.songs);
    setqueuechange(!queuechange);
  };
  const playlistdelete = (playlist: Playlist) => {
    let data = JSON.stringify({
      name: playlist.name,
      userId: userid,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_ENDPOINTS.GET_PLAYLISTS}/delete`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then(() => {
        toast.success("Successfully deleted the playlist", {
          position: "top-right", // Use the string directly instead of accessing POSITION
          autoClose: 5000, // Duration in milliseconds
        });
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in deleting the playlist", {
          position: "top-right", // Use the string directly instead of accessing POSITION
          autoClose: 5000, // Duration in milliseconds
        });
      });
  };
  const createPlaylist = async () => {
    let data = JSON.stringify({
      name: playlistName,
      userId: userid,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_ENDPOINTS.GET_PLAYLISTS}/create`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then(() => {
        toast.success("Successfully created the playlist", {
          position: "top-right", // Use the string directly instead of accessing POSITION
          autoClose: 5000, // Duration in milliseconds
        });
        setRefresh(!refresh);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // Check if the error has a response and if the status code is 400
          toast.error("Error: Playlist name already exists or invalid data.", {
            position: "top-right",
            autoClose: 5000,
          });
        } else {
          toast.error("An unexpected error occurred.", {
            position: "top-right",
            autoClose: 5000,
          });
        }
      });
  };
  const addsongtoplaylist = async (plistid: string, songid: string) => {
    let data = JSON.stringify({
      playlistId: plistid,
      songId: songid,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_ENDPOINTS.GET_PLAYLISTS}/insert`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then(() => {
        toast.success("Successfully added the song to playlist", {
          position: "top-right", // Use the string directly instead of accessing POSITION
          autoClose: 5000, // Duration in milliseconds
        });
        setRefresh(!refresh);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // Check if the error has a response and if the status code is 400
          toast.error("Error: Song is already in the playlist.", {
            position: "top-right",
            autoClose: 5000,
          });
        } else {
          toast.error("An unexpected error occurred.", {
            position: "top-right",
            autoClose: 5000,
          });
        }
      });
  };
  const editPlaylist = (playlist: Playlist) => {
    seteditingplaylist(playlist);
    seteditMode(true);
  };
  const closeediting = () => {
    seteditMode(false);
  };
  return (
    <div className="container-fluid">
      {editMode && (
        <FloatingDiv
          playlist={editingplaylist}
          setplaylist={seteditingplaylist}
          closeediting={closeediting}
          refresh={refresh}
          setRefresh={setRefresh}
        ></FloatingDiv>
      )}
      <div className="row" style={{ height: "calc(100vh - 165px )" }}>
        <div
          className="col-md-3 scroll-column"
          style={{ height: "calc(100vh - 165px )" }}
        >
          <div className="p-3">
            <div
              className="fixed-top-in-parent"
              style={{ marginBottom: "10px", paddingBottom: "2px" }}
            >
              <h3 style={{ marginBottom: "5px" }}>Your Playlists</h3>
              <div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter playlist name"
                    aria-label="Enter playlist name"
                    aria-describedby="button-addon2"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    style={{ backgroundColor: "#00ffb3" }}
                    type="button"
                    onClick={createPlaylist}
                    id="button-addon2"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
            {playlists.length === 0 && <h5>No Playlists please add one.</h5>}
            {playlists.map((cur: Playlist) => (
              <Playlist_element
                playlistplay={playlistplay}
                playlist={cur}
                playlistdelete={playlistdelete}
                editPlaylist={editPlaylist}
              />
            ))}
          </div>
        </div>
        <div
          className="col-md-6 scroll-column"
          style={{ height: "calc(100vh - 165px )" }}
        >
          <div className="p-3">
            <h3 className="fixed-top-in-parent" style={{ marginBottom: "8px" }}>
              Discover
            </h3>
            {songs.length === 0 && (
              <h5>No songs found applying this filter.</h5>
            )}
            {songs.map((cur: Song) => (
              <Discover_element
                title={cur.title}
                artist={cur.artist}
                coverImage={cur.coverImage}
                id={cur._id}
                album={cur.album}
                duration={cur.duration}
                audioFile={cur.audioFile}
                genre={cur.genre}
                createdAt={cur.createdAt}
                lyrics={cur.lyrics}
                song={cur}
                addToQueue={addToQueue}
                Playlist={playlists}
                addsongtoplaylist={addsongtoplaylist}
                handlePlayOne={handlePlayOne}
              />
            ))}
          </div>
        </div>
        <div
          className="col-md-3 scroll-column"
          style={{ height: "calc(100vh - 165px )" }}
        >
          <div className="p-3">
            <h3 className="fixed-top-in-parent" style={{ marginBottom: "8px" }}>
              Queue
            </h3>
            {queue.length === 0 && (
              <h5>No songs in queue add some or add a playlist.</h5>
            )}
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="queue">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      padding: "10px",
                    }}
                  >
                    {queue.map((cur: Song, index: number) => (
                      <Draggable
                        key={cur.title}
                        draggableId={cur.title}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps} // Make the item draggable
                          >
                            <Queue_element
                              index={index}
                              title={cur.title}
                              artist={cur.artist}
                              coverImage={cur.coverImage}
                              id={cur._id}
                              album={cur.album}
                              duration={cur.duration}
                              audioFile={cur.audioFile}
                              genre={cur.genre}
                              queue={queue}
                              removeFromQueue={removeFromQueue}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder} {/* Placeholder for drag and drop */}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mid;
