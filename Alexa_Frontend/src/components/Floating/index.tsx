import { useEffect } from "react";
import Song from "../../models/song";
import Editing_element from "./componants/Editing_element";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import API_ENDPOINTS from "../../config";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { toast } from "react-toastify";

const FloatingDiv = ({
  playlist,
  setplaylist,
  closeediting,
  refresh,
  setRefresh,
}: any) => {
  const [user, _setUser] = useLocalStorage("user", null);
  const token = user.token;
  const removesong = (id: string) => {
    const updatedSongs = playlist!.songs.filter(
      (song: Song) => song._id !== id
    );
    setplaylist({
      ...playlist!,
      songs: updatedSongs,
    });
  };
  useEffect(() => {
    let data = JSON.stringify({
      playlistId: playlist._id,
      songs: playlist.songs.map((song: Song) => song._id),
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_ENDPOINTS.GET_PLAYLISTS}/update`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then(() => {
        toast.success("Successfully updated the playlist", {
          position: "top-right", // Use the string directly instead of accessing POSITION
          autoClose: 3000, // Duration in milliseconds
        });
        setRefresh(!refresh);
      })
      .catch(() => {
        toast.error("An unexpected error occurred.", {
          position: "top-right",
          autoClose: 5000,
        });
      });
  }, [playlist]);
  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    // Exit if the item is dropped outside the list
    if (!destination) return;

    // Reorder the songs
    const reorderedSongs = Array.from(playlist.songs);
    const [movedSong] = reorderedSongs.splice(source.index, 1);
    reorderedSongs.splice(destination.index, 0, movedSong);

    // Update the playlist with the reordered songs
    setplaylist({
      ...playlist!,
      songs: reorderedSongs,
    });
  };
  return (
    <div className="floating-div">
      <button
        type="button"
        className="button-85"
        aria-label="Close"
        onClick={() => {
          closeediting();
        }}
      >
        Close Editing
      </button>
      {playlist!.songs.length === 0 && <h5>No Songs in this playlist.</h5>}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="playlist">
          {(provided: any) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ padding: "10px" }}
            >
              {playlist!.songs.map((song: Song, index: number) => (
                <Draggable
                  key={String(song._id)}
                  draggableId={String(song._id)}
                  index={index}
                >
                  {(provided: any) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Editing_element song={song} removesong={removesong} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default FloatingDiv;
