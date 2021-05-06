//import ReCAPTCHA from "react-google-recaptcha";
import "./Profile.css";
import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {isLogged,getPublicId,getToken, logout} from "../../Services/authentication";

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { Box } from "@material-ui/core";

import GamePage from "../GamePage/GamePage"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(1),
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
    root: {
      flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0, 3),
      
    },
    cardroot:{
      maxWidth: 'auto',
      margin: 'auto',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    box: {
      height: 50,
      display: "flex",
      padding: 8,
      justifyContent: "flex-end",
      alignItems: "flex-end"
    },
  }),
);

interface ParamTypes {
  username: string
}



export default function Profile(props: { history: any[]; }){
    const token = getToken();
    const classes = useStyles();
    const [expandedId, setExpandedId] = React.useState(-1);   
    const [expandedFriendId, setExpandedFriendId] = React.useState(-1);
    const [userProfile, setUserProfile] = React.useState({
      data: {
        username: "",
        uid: 0,
        public_id: 0,
        fname: "",
        lname: "",
      },
      rendered: false
    });
    const [allGames, setAllGames] = React.useState([]);
    let {username} = useParams<ParamTypes>();


    async function getUser() {
      const response = await fetch('/api/user', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-Access-Token" : `${token}`

        }
      });
      const users = await response.json();
      console.log(users);

      if(users['status'] == "Token is invalid!"){
        logout();
      }
      else{
        if(users['username'] != username){
          window.location.href="/profile/"+users['username']
        }
        setUserProfile({
          data: {
            username: users['username'],
            uid: users['uid'],
            public_id: users['publicId'],
            fname: users['fname'],
            lname: users['lname'],
          },
          rendered: true
        });
      }


    }

    async function getAllCampaigns() {
      const response = await fetch('/api/getgames', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-Access-Token" : `${token}`

        },
      });
      const data = await response.json();
      console.log(data);

      if(data['status'] == "Token is invalid!"){
        logout();
        window.location.href='/'

      }
      if(data['status'] == "Success"){
          setAllGames(data['games']);
      }


    }

    async function createRoom(id_: number, password_: string) {
      const response = await fetch('/api/create-room', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-Access-Token" : `${token}`

        },
        body: JSON.stringify({
          rpassword: password_,
          cmid: id_
        })
      });
      const data = await response.json();

      if(data['status'] == "Success"){
        window.location.href="/gamePage/room="+data['room']+"&code="+data['password']
      }else{
        console.log("Not logged in", "room-create fail")
      }

      console.log(data, "room");

      if(data['status'] == "Token is invalid!"){
        logout();
        window.location.href='/'
      }


    }



    useEffect(() => {
      if(!userProfile.rendered){
        getUser();
      }
    },[]);

    useEffect(() => {
      getAllCampaigns();
      console.log(allGames)
    },[]);


    const games = [{ _id: "1" }, { _id: "2" }, { _id: "3" }];
    const friends = [{ _id: "1", name : "Carlos" }, { _id: "2", name : "Miguel" }, { _id: "3", name : "Amanda" }];


    const handleExpandClick = (i: number) => {
      setExpandedId(expandedId === i ? -1 : i);
    };
    const handleExpandClickFriend = (i: number) => {
      setExpandedFriendId(expandedFriendId === i ? -1 : i);
    };


    if(allGames.length == 0){
      return (
        <div className={classes.root}>
          <Typography variant="h4" gutterBottom>
            {userProfile.data.fname}
          </Typography>
          <Grid container spacing={1} justify="center" alignItems='center'>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
              Games
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item xs>
                    <Typography component={'span'}>
                      No Games     
                    </Typography>
                    <Box component="span" m={1} className={classes.box}>
                        <Button variant="contained" color="secondary" style={{ borderRadius: 20 }} href="/create-game" >
                          Add
                        </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                Friends
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item xs>
                    <Typography component={'span'}>
                      No Friends     
                    </Typography>
                    <Box component="span" m={1} className={classes.box}>
                        <Button variant="contained" color="secondary" style={{ borderRadius: 20 }} >
                          Add
                        </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          
              <Grid item xs={4}>
                <Grid container>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                    User Description
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      Character List
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            
          
          </Grid>
          <Divider className={classes.divider} />
          
        </div>
        
      )

    }
    else{
      return (
        <div className={classes.root}>
          <Typography variant="h4" gutterBottom>
            {userProfile.data.fname}
          </Typography>
          <Grid container spacing={1} justify="center" alignItems='center'>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
              Games
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item xs>
                    <Typography component={'span'}>
  
                    {allGames.map((game, i) => (
                      <Card className={classes.cardroot} key={game['cmid']}>
                        {game['cname']}
                        <CardContent />
                        <CardActions disableSpacing>
                          <IconButton
                            className={clsx(classes.expand, {
                              [classes.expandOpen]: expandedId,
                            })}
                            onClick={() => handleExpandClick(i)}
                            aria-expanded={expandedId === i}
                            aria-label="show more"
                          >
                            <ExpandMoreIcon />
                          </IconButton>
                        </CardActions>
                        <Collapse in={expandedId === i} timeout="auto" unmountOnExit>
                          <CardContent>
                            <Typography paragraph>Description:</Typography>
                            <Typography paragraph>
                              {game['cdescription']}
                            </Typography>
                            <Typography>Entry Code</Typography> 
                            <Typography>{game['password']}</Typography>
                            <Box component="span" m={1} className={classes.box}>
              
                              <Button variant="contained" color="secondary" style={{ borderRadius: 20 }} onClick={() => { createRoom(game['cmid'], game['password'])}}>                      
                                Play
                              </Button>
                            </Box>
                          </CardContent>
                        </Collapse>
                      </Card>
                    ))}
                      <Box component="span" m={1} className={classes.box}>
                        <Button variant="contained" color="secondary" style={{ borderRadius: 20 }} href="/create-game" >
                          Add
                        </Button>
                      </Box>
                      
                      
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                Friends
  
                  {friends.map((friend, i) => (
                        <Card className={classes.cardroot} key={friend._id}>
                          {friend.name}
                          <CardContent />
                          <CardActions disableSpacing>
                            <IconButton
                              className={clsx(classes.expand, {
                                [classes.expandOpen]: expandedFriendId,
                              })}
                              onClick={() => handleExpandClickFriend(i)}
                              aria-expanded={expandedFriendId === i}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </IconButton>
                          </CardActions>
                          <Collapse in={expandedFriendId === i} timeout="auto" unmountOnExit>
                            <CardContent>
                              <div>Description:</div>
                            </CardContent>
                          </Collapse>
                        </Card>
                      ))}
                    <Box component="span" m={1} className={classes.box}>
                      <Button variant="contained" color="secondary" style={{ borderRadius: 20 }} onClick={() => { alert('clicked') }}>
                        Add
                      </Button>
                    </Box>
              </Paper>
            </Grid>
          
              <Grid item xs={4}>
                <Grid container>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                    User Description
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      Character List
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            
          
          </Grid>
          <Divider className={classes.divider} />
          
        </div>
        
      )
    }
  }
   