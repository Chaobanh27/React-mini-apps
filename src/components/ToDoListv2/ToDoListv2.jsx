import React, { useEffect, useState } from 'react'
import RenderError from '../PhoneBook/RenderError'
import {FaCheck} from 'react-icons/fa'
import {AiFillDelete} from 'react-icons/ai'


export const ToDoListv2 = () => {
      let jobDataCheck = localStorage.getItem("JobData")
      let jobData
      if(jobDataCheck !== null){
        jobData = JSON.parse(jobDataCheck)
      }
      const [jobs, setJobs] = useState({
        jobName:"",
        isComplete:false
      });
      const [error, setError] = useState({});
      const [data, setData] = useState(jobData ?? []);

      let dataCopy = [...data]

      useEffect(() => {
        localStorage.setItem("JobData",JSON.stringify(data));
    },[data])
    
    function handleComplete(name) {
        setData(state => {
        return state.map((value,key) => {
            if (value.jobName === name) {
            return { ...value, isComplete: !value.isComplete };
            }
            return value;
        });
        });
    }

    function handleDelete(name){
        setData(dataCopy.filter((e) => e.jobName !== name ))
    }


      function handleChange(e) {
        let inputName = e.target.name;
        let inputVal = e.target.value;
        setJobs((state) => ({ ...state, [inputName]: inputVal }));
      }


      function handleSubmit(e) {
        e.preventDefault();
        let errorsSubmit = {};
        let flag = true;
        //check input
        if (jobs.jobName === "") {
          errorsSubmit.jobName = "job name không được để trống";
          flag = false;
        } else {
          errorsSubmit.jobName = "";
          flag = true;
        }

        if (flag) {
          setData((state) => {
            let newData = [...state, jobs];
            let newDataJson = JSON.stringify(newData);
            localStorage.setItem("JobData", newDataJson);
            return newData;
          });
        } else {
          setError(errorsSubmit);
        }
      }
    
      function renderItem() {
        if (data.length > 0) {
          return data.map((value,key) => (
            <tr key={key}>
              <td>
                <span className={value.isComplete ? "complete" : ""}>{value.jobName}</span>
              </td>
              <td>
                <button onClick={() => handleComplete(value.jobName)}>
                    <FaCheck/>
                </button>
                <span> </span>
                <button onClick={() => handleDelete(value.jobName)}>
                    <AiFillDelete/>
                </button>
              </td>
            </tr>
          ));
        }
      }
    
      return (
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
                            <input name='jobName' type="text" id="form1"  onChange={handleChange} placeholder='Enter a task here' className="form-control" />
                            </div>
                        </div>

                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>

                        </form>
                        <RenderError errors={error}/>

                        <table className="table mb-4">
                        <thead>
                            <tr>
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
      );
}