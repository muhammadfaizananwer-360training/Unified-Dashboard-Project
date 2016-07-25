export default function({dispatch}){
  return next => action => {

    //console.log('M1 || M3', action);

    //  M1 and M3
    if(!action.payload || !action.payload.then){
      return next(action);
    }

    //console.log('M2',action.type);

    // M2
    action.payload
      .then(function(response){
        //const newAction = {...action, payload:response.data}
        dispatch({...action, payload:response.data});
      }).catch(function (response) {
        //const newAction = {...action, payload:response}
        console.log(response);
        dispatch({...action, payload:response.data});
     });

  }
}
