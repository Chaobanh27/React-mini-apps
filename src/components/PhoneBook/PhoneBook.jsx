import React, { useEffect, useState } from "react";
import RenderError from "./RenderError"
export const PhoneBook = () => {
  const style = {
    table: {
      borderCollapse: "collapse",
    },
    tableCell: {
      border: "1px solid gray",
      margin: 0,
      padding: "5px 10px",
      width: "max-content",
      minWidth: "150px",
    },
    form: {
      container: {
        padding: "20px",
        border: "1px solid #F0F8FF",
        borderRadius: "15px",
        width: "max-content",
        marginBottom: "40px",
      },
      inputs: {
        marginBottom: "5px",
      },
      submitBtn: {
        marginTop: "10px",
        padding: "10px 15px",
        border: "none",
        backgroundColor: "lightseagreen",
        fontSize: "14px",
        borderRadius: "5px",
      },
    },
  };

  const PhoneBookForm = (props) => {
    let userDataCheck = localStorage.getItem("UserData")
    let userData
    if(userDataCheck !== null){
      userData = JSON.parse(userDataCheck)
    }
    const [input, setInput] = useState({
      userFirstname: "Coder",
      userLastname: "byte",
      userPhone: "8886669999",
    });
    const [error, setError] = useState({});
    //Giá trị ban đầu của data được đặt là userData nếu userData không phải là null,
    //ngược lại nếu userData là null thì giá trị ban đầu của data sẽ là một mảng rỗng []
    const [data, setData] = useState(userData ?? []);

    useEffect(() => {
      props.getUserData(data)
    },[data,props])

    function handleChange(e) {
      let inputName = e.target.name;
      let inputVal = e.target.value;
      setInput((state) => ({ ...state, [inputName]: inputVal }));
    }

    function handleSubmit(e) {
      e.preventDefault();
      let errorsSubmit = {};
      let flag = true;
      //check first name
      if (input.userFirstname === "") {
        errorsSubmit.userFirstname = "first name Không được để trống";
        flag = false;
      } else {
        errorsSubmit.userFirstname = "";
        flag = true;
      }

      //check last name
      if (input.userLastname === "") {
        errorsSubmit.userLastname = "last name Không được để trống";
        flag = false;
      } else {
        errorsSubmit.userLastname = "";
        flag = true;
      }

      //check phone
      if (input.userPhone === "") {
        errorsSubmit.userPhone = "phone Không được để trống";
        flag = false;
      } else {
        errorsSubmit.userPhone = "";
        flag = true;
      }

      if (flag) {
        setData((state) => {
          let newData = [...state, input];
          let newDataJson = JSON.stringify(newData);
          localStorage.setItem("UserData", newDataJson);
          return newData;
        });
      } else {
        setError(errorsSubmit);
      }
    }

    return (
      <>
      <RenderError errors={error}/>
        <form onSubmit={handleSubmit} style={style.form.container}>
          <div>
            <label>First Name</label>
            <br/>
            <input
              style={style.form.inputs}
              className="userFirstname"
              name="userFirstname"
              type="text"
              value={input.userFirstname}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Last Name</label>
            <br/>
            <input
              style={style.form.inputs}
              className="userLastname"
              name="userLastname"
              type="text"
              value={input.userLastname}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Phone</label>
            <br/>
            <input
              style={style.form.inputs}
              className="userPhone"
              name="userPhone"
              type="text"
              value={input.userPhone}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              style={style.form.submitBtn}
              className="submitButton"
              type="submit"
              value="Add User"
            />
          </div>
        </form>
      </>
    );
  };

  const InformationTable = (props) => {
    let userInputData = props.userInputData ?? props.userInputData.sort((a, b) => a.userLastname.localeCompare(b.userLastname))
    
    function renderData() {
      if (userInputData.length > 0) {
        return userInputData.map((value, key) => {
          return (
            <tr key={key}>
              <td>{value.userFirstname}</td>
              <td>{value.userLastname}</td>
              <td>{value.userPhone}</td>
            </tr>
          );
        });
      }
    }

    return (
      <>
        <table style={style.table} className="informationTable">
          <thead>
            <tr>
              <th style={style.tableCell}>First name</th>
              <th style={style.tableCell}>Last name</th>
              <th style={style.tableCell}>Phone</th>
            </tr>
          </thead>
          <tbody>{renderData()}</tbody>
        </table>
      </>
    );
  };

  const PhoneBookIndex = () => {
    const [data,setData] = useState([])

    function getUserData(e){
      setData(e)
    }
    return(
      <>
        <PhoneBookForm getUserData={getUserData}  />
        <InformationTable userInputData={data} />
      </>
    )
  }
  return (
    <>
      <PhoneBookIndex/>
    </>
  );
};
