import {useEffect, useState} from "react";
import {Box, Grid2, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";
import {styled} from "@mui/material/styles";


import SignUp from "./SignUp/SignUp";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import SignIn from "./SignIn/SignIn";
import {getDatabase, ref, get} from "firebase/database";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const paperStyle={padding :20, minHeight:'36vh', maxWidth: 360, margin:'60px auto'};

const AuthTitle = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.h2.fontSize,
    fontWeight: 'bold',
}));


const Profile = () => {
    const [auth, setAuth] = useState(false);
    const [login, setLogin] = useState(false);
    const [data, setData] = useState(null);
    const  [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handlerChange = (e) => {
        return setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const fetchUserData = async (uid) => {
        const db = getDatabase();
        const userRef = ref(db, `user/${uid}/userInfo`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            setData(snapshot.val());
        } else {
            console.log("No data available");
        }
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuth(true);
                fetchUserData(user.uid);
            } else {
                setAuth(false);
                setData(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
            {data && auth ? <ProfileInfo data={data}/> : (
                <Grid2>
                    <Paper elevation={10} style={paperStyle}>
                        <Box align="center" sx={{mb: 4}}>
                            <h2>
                                {login ? <AuthTitle>Sign In</AuthTitle> : <AuthTitle>Sign Up</AuthTitle>}
                            </h2>
                        </Box>
                        {login ? (
                                <SignIn
                                    handlerChange={handlerChange}
                                    formState={formState}
                                    setLogin={setLogin}
                                    setFormState={setFormState}
                                    setAuth={setAuth}
                                />
                            )
                            : (
                                <SignUp
                                    handlerChange={handlerChange}
                                    formState={formState}
                                    setFormState={setFormState}
                                    setLogin={setLogin}
                                />
                            )}
                    </Paper>
                </Grid2>)
            }
        </>
    );
};

export default Profile;