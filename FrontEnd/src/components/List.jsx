import axios from "axios";
import { useState } from "react";

function List({ title, id }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  async function deleteData(id){
    axios.delete(`http://localhost:3000/todo/${id}`).then((res)=>{
        console.log("successfully deleted")
    }).catch((error)=>{
        console.error(error.message)
    })
  }
  
  async function update(e, id) {
    e.preventDefault(); // Prevent form submission default behavior
    console.log("Updating task with ID:", id);
  
    try {
      await axios.put(`http://localhost:3000/todo/${id}`, { title: newTitle }); // Adjust endpoint
      setIsEdit(false); // Exit edit mode
      console.log("Successfully updated");
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  }
  

  return (
    <>
      <div className="w-[100%] flex justify-center items-center">
        {isEdit ? (
          <>
            <form
              className="flex w-[50%] justify-end items-center border border-green-800"
              onSubmit={(e) => update(e, id)} // Use form submission handler
            >
              <div className="flex-1">
                <input
                  type="text"
                  onChange={(e) => setNewTitle(e.target.value)}
                  value={newTitle} // Bind input value to state
                  className="w-[100%] px-4 py-2 focus:outline-none"
                  required
                />
              </div>
              <div className="flex-0.8">
                <button
                  type="submit"
                  className="bg-green-900 text-white px-4 py-2"
                >
                  Update
                </button>
                <button
                  type="button" // Prevent form submission
                  className="bg-red-600 text-white px-5 py-2"
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex w-[50%] justify-between items-center border gap-0 border-green-800">
            <div className="w-[40%] pl-3">
              {isComplete ? (
                <h1>
                  <s className="text-red-500">{title}</s>
                </h1>
              ) : (
                <h1>{title}</h1>
              )}
            </div>
            <div>
              <button
                className="bg-green-900 text-white px-4 py-2"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
              <button className="bg-red-600 text-white px-5 py-2" onClick={()=>{deleteData(id)}}>
                Delete
              </button>
              {isComplete ? (
                <button
                  className="bg-blue-700 text-white px-5 py-2"
                  onClick={() => setIsComplete(false)}
                >
                  Cancel to Complete
                </button>
              ) : (
                <button
                  className="bg-blue-700 text-white px-5 py-2"
                  onClick={() => setIsComplete(true)}
                >
                  Complete Task
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default List;
