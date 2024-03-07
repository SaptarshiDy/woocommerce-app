import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { retriveSession } from '../redux/slices/auth';

//Import Components
import Loading from '../components/Loading';

export default (props: any) => {

    const auth = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(retriveSession());
    }, [])

    return (
        <>
            {props.children}
            {
                auth.loading && <Loading/>
            }
        </>
    );
};