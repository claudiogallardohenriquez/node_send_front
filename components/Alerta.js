import React, {useContext} from 'react';

import appContext from '../context/app/appContext';

const Alerta = () => {

    const AppContext = useContext(appContext);
    const { mensaje_archivo } = AppContext;

    return (  
        <div className="bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto">
            { mensaje_archivo }
        </div>
    );
}
 
export default Alerta;