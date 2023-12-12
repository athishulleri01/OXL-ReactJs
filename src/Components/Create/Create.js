import React, { Fragment, useContext, useState ,useRef,useEffect} from "react";
import "./Create.css";
import Header from "../Header/Header";
import { AuthContext, FirebaseContext } from "../../store/Context";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'

const Create = () => {
  const history = useHistory()
  const inputRef=useRef()
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const date=new Date()

  useEffect(()=>{
    inputRef.current.focus();
  },[])

  const handleSubmit = () => {
    // validation
    if (!name.trim()) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please enter a valid name",
        showConfirmButton: false,
        timer: 1500
      });

      return;
    }

    if (name.trim().length < 5) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Username must contain at least 5 letters",
        showConfirmButton: false,
        timer: 1500
      });

      return;
    }

    // Validate Category
    if (!category.trim()) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please enter a valid category",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

   

    // Validate Price
    if (!price || isNaN(price) || price <= 0) {

      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please enter a valid price",
        showConfirmButton: false,
        timer: 1500
      });
     
      return;
    }

    // Validate Image
    if (!image) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please select an image",
        showConfirmButton: false,
        timer: 1500
      });
      
      return;
    }


    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref}) => {
      ref.getDownloadURL().then((url)=>{
        console.log(url);
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId:user.uid,
          date:date.toDateString()
        })
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product added successfully",
          showConfirmButton: false,
          timer: 1500
        });
        history.push('/')
      })
    })
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            ref={inputRef}
            id="fname"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />

          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>

          <br />
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <br />
          <button className="uploadBtn" onClick={handleSubmit}>
            upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
