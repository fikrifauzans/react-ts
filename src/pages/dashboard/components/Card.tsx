import { Grid, Card, CardContent, Typography, Box } from '@mui/material';


export default function CardDashboardGrid(

    {title, description, unit, value}
) {
  return (
    <Grid xs={12} sm={4} md={3} item>
      <Card
        sx={{
          px: 1
        }}
      >
        <CardContent>
          <Typography variant="h5" noWrap>
            {title}
          </Typography>
          <Typography variant="subtitle1" noWrap>
            {description}
          </Typography>
          <Box
            sx={{
              pt: 3
            }}
          >
            <Typography variant="h3" gutterBottom noWrap>
              {value}
            </Typography>
            <Typography variant="subtitle2" noWrap>
              {unit}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
