import {useEffect, useState} from 'react';
import { Grid2 } from '@mui/material';


import Review from "../Review/Review";
import AllReviews from "../AllReviews/AllReviews";
import EmptySection from "../Status/EmptySection";
import {getDatabase, ref, get} from "firebase/database";
import {auth} from "../../firebase/firebase";
import {onAuthStateChanged} from "firebase/auth";


const Home = () => {
    const [userId, setUserId] = useState(null)
    const [currUserRole, setCurrUserRole] = useState('')

    const fetchCurrentUserInfo = async (currentUserId) => {
        const db = getDatabase();
        const userRef = ref(db, `user/${currentUserId}/userInfo`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            const userInfo = snapshot.val();
            setCurrUserRole(userInfo.role);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchCurrentUserInfo(user.uid);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
            <Grid2 container spacing={2} sx={{ flexGrow: 1, my: 9 }}>
                <Grid2 item xs={12} md={3.5}>
                    <AllReviews setUserId={setUserId}/>
                </Grid2>
                <Grid2 item xs={12} md={8.5}>
                    {userId
                        ? <Review currUser={currUserRole} userId={userId} />
                        : <EmptySection />}
                </Grid2>
            </Grid2>
        </>
    );
};

export default Home;