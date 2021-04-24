//import ReCAPTCHA from "react-google-recaptcha";
import "./Profile.css";
import React, {useEffect} from 'react';
import {isLogged,getPublicId,getToken, logout} from "../../Services/authentication";

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { Box } from "@material-ui/core";

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



export default function Profile(props: { history: string[]; }){
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

    async function getUser() {
      const response = await fetch('/api/user', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publicId: getPublicId(),
          token: getToken(),
        })
      });
      const users = await response.json();
      console.log(users);

      if(users['status'] == "Token is invalid!"){
        logout();
      }
      else{
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

    useEffect(() => {
      if(!userProfile.rendered){
        getUser();
      }
    });


    const games = [{ _id: "1" }, { _id: "2" }, { _id: "3" }];
    const friends = [{ _id: "1" }, { _id: "2" }, { _id: "3" }];


    const handleExpandClick = (i: number) => {
      setExpandedId(expandedId === i ? -1 : i);
    };
    const handleExpandClickFriend = (i: number) => {
      setExpandedFriendId(expandedFriendId === i ? -1 : i);
    };

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
                  <Typography>

                  {games.map((game, i) => (
                    <Card className={classes.cardroot} key={game._id}>
                      Game
                      <CardContent />
                      <CardActions disableSpacing>
                        {/* <IconButton aria-label="add to favorites">
                          <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                          <ShareIcon />
                        </IconButton> */}
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
                            This is the game description. If "Play" button is pressed the ongoing game will start.
                          </Typography>
                          <Box component="span" m={1} className={classes.box}>
                            <Button variant="contained" color="secondary" style={{ borderRadius: 20 }}>
                              Play
                            </Button>
                          </Box>
                        </CardContent>
                      </Collapse>
                    </Card>
                  ))}



                    {/* <Card className={classes.cardroot}>
                      <CardHeader
                        // action={
                        //   <IconButton aria-label="settings">
                        //     <MoreVertIcon />
                        //   </IconButton>
                        // }
                        title="DnD Game 1"
                        subheader="September 14, 2016"
                      />
                      {/* <CardMedia
                        className={classes.media}
                        image="/Images/DnD4.jpg"
                        title="Paella dish"
                      /> */}
                      {/* <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                          This impressive paella is a perfect party dish and a fun meal to cook together with your
                          guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                      </CardContent> 
                      <CardActions disableSpacing>
                        <IconButton
                          onClick={handleExpandClick(i)}
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
                            This is the game description. If "Play" button is pressed the ongoing game will start.
                          </Typography>
                          <Box component="span" m={1} className={classes.box}>
                            <Button variant="contained" color="secondary" style={{ borderRadius: 20 }}>
                              Play
                            </Button>
                          </Box>
                        </CardContent>
                      </Collapse>
                    </Card> */}
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
                        Friend
                        <CardContent />
                        <CardActions disableSpacing>
                          {/* <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                          </IconButton>
                          <IconButton aria-label="share">
                            <ShareIcon />
                          </IconButton> */}
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
                            <div>ActivitiesList</div>
                          </CardContent>
                        </Collapse>
                      </Card>
                    ))}
                  {/* <Card className={classes.cardroot}>
                    <CardHeader
                      // avatar={
                      //   <Avatar aria-label="recipe" className={classes.avatar}>
                      //     R
                      //   </Avatar>
                      // }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title="Bob Bobson"
                      subheader="September 14, 2016"
                    />
                    {/* <CardMedia
                      className={classes.media}
                      image="/Images/DnD4.jpg"
                      title="Paella dish"
                    /> */}
                    {/* <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                        This impressive paella is a perfect party dish and a fun meal to cook together with your
                        guests. Add 1 cup of frozen peas along with the mussels, if you like.
                      </Typography>
                    </CardContent> */}
                    {/* <CardActions disableSpacing> */}
                      {/* <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography paragraph>Description:</Typography>
                        <Typography paragraph>
                          Loves hotdogs!
                        </Typography>   
                      </CardContent>
                    </Collapse>
                  </Card> */}
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