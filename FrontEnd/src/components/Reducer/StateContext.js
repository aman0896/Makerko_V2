import React from 'react';
import { CreateContext } from '../global/CreateContext';

export default function StateContext({ children }) {
    return (
        <CreateContext.Provider value={''}>{children}</CreateContext.Provider>
    );
}
