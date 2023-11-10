import React, {  useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "./ToDoList.css"

function ToDoList() {

    let getJobsCheck = localStorage.getItem("JOBS")
    let getJobs

    if(getJobsCheck !== null){
        getJobs = JSON.parse(getJobsCheck)
    }

    const [job,setJob] = useState("")
    //Giá trị ban đầu của data được đặt là userData nếu userData không phải là null,
    //ngược lại nếu userData là null thì giá trị ban đầu của data sẽ là một mảng rỗng []
    const [jobs,setJobs] = useState(getJobs ?? [])

    const notify = () => {
        toast.success('Success', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }

    function handleSubmit(e){
        e.preventDefault()
        setJobs(state => {
           let newJobs = [...state,job]
           let newJobsjson = JSON.stringify(newJobs)
           localStorage.setItem("JOBS",newJobsjson)
           return newJobs
        })
        setJob("")
    }
    

    function handleChange(e){
        let getVal = e.target.value
        setJob(getVal)
    }

    const [isComplete,setIsComplete] = useState(false)

    function handleComplete(){
        setIsComplete(!isComplete)
    }

    function renderItem(){
        if(jobs.length > 0){
            return jobs.map((value,key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td >
                        <span className={`${isComplete === true ? "complete" : "" }`}>{value}</span>
                    </td>
                    <td>
                    <button id={key} onClick={handleComplete}>Done</button>
                    </td>

                  </tr>
                )
            })
        }

    }


  return (
    <>
    <section className="todo-app" >
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card rounded-3">
                    <div className="card-body p-4">

                        <h4 className="text-center my-3 pb-3">To Do App</h4>

                        <form onSubmit={handleSubmit} className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                        <div className="col-12">
                            <div className="form-outline">
                            <input name='job' type="text" id="form1" value={job}  onChange={handleChange} placeholder='Enter a task here' className="form-control" />
                            </div>
                        </div>

                        <div className="col-12">
                            <button onClick={notify} type="submit" className="btn btn-primary">Save</button>
                        </div>

                        </form>

                        <table className="table mb-4">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Todo item</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderItem()}
                        </tbody>
                        </table>

                    </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <ToastContainer 
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
    />
    </>
  )
}

export default ToDoList