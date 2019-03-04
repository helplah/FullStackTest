import UpdateStore from './UpdateStore';

const UpdateCart = (event, id) => {
  return (dispatch) => {
    fetch('/api/cart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json' 
      }, 
      body: JSON.stringify({
        event,
        id
      })
    })
    .then(res => {
      try {
        if (!res.ok) {
          throw new Error(res.statusText);
        } 
        
        return res;
      } catch(error) {
        console.log(error);
      }
    })
    .then(res => res.json())
    .then(res => dispatch(UpdateStore(res)))
    .catch(error => console.log(error));
  }
}

export default UpdateCart;