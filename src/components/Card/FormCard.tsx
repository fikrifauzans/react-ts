import {
  Container,
  Grid,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Box
} from '@mui/material';

export default function FormCard({ children, title }) {
  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title={title ?? ''} />
              <Divider />
              <CardContent>{children ?? ''}</CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
