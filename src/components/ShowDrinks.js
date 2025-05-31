import { useState } from "react";

function ShowDrink(){

    const [show, setShow] = useState(false);

    const toggleDrink = () => {
      setShow(!show);
    }

    return(
       <div>
        {show && (
          <div style={{
            marginTop: '10px',
            padding: '2rem',
            border: '1px solid black',
            backgroundColor: 'grey'
          }}></div>
        )}
       </div>
      
    );
  }

  export default ShowDrink;