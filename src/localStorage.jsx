// // function to load state from localStorage

// export const loadState = () => {
//     try{
//         const newState = localStorage.getItem('reduxState');
//         if(newState === null){
//             return undefined;
//         }
//         return JSON.parse(newState);
//     } catch (err){
//         console.log('Could not load State', err);
//         return undefined;
//     }
// };

// // function to save state in local Storage...
// export const saveState = ()=> {
//     try{
//         const newState = JSON.stringify(state);
//         localStorage.getItem('reduxState', newState);
//     } catch (err){
//         console.log('Could not load state', err);
//     }
// };