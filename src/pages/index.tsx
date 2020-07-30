import { Microphone } from "../../model/Microphone";
import { GetStaticProps } from "next";
import { openDB } from "../openDB";
import Link from 'next/link';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from "@material-ui/core";

export interface IndexProps {
  microphones: Microphone[];
}

export default function Index({ microphones }: IndexProps) {
  return (
    <Grid container spacing={1}>
      {microphones.map(mic => {
        return (
          <Grid container item xs={12} sm={6} spacing={3}>
            <Link href="/microphone/[id]" as={`/microphone/${mic.id}`}>
              <a>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={mic.model + ' ' + mic.brand}
                      height="200"
                      image={mic.imageUrl}
                      title={mic.model + ' ' + mic.brand}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {mic.brand + ' ' + mic.model}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </a>
            </Link>
          </Grid>
        )
      })}
    </Grid>
  )
}

export const getStaticProps: GetStaticProps = async ctx => {
  const db = await openDB();
  const microphones = await db.all('select * from microphone');

  return { props: { microphones } };
}