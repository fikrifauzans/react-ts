import { Typography, Grid } from '@mui/material';
import { ReactElement } from 'react';
import PageTitleWrapper from '../PageTitleWrapper';

interface MetaPageHeaderInterface {
  title: string;
  description: string;
}

function PageHeader({ meta, action }) {
  const metaPageHeader: MetaPageHeaderInterface = meta;
  const pageAction: ReactElement = action;

  return (
    <PageTitleWrapper>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {metaPageHeader.title}
          </Typography>
          <Typography variant="subtitle2">
            {metaPageHeader.description}
          </Typography>
        </Grid>
        <Grid item>{pageAction ?? ""}</Grid>
      </Grid>
    </PageTitleWrapper>
  );
}

export default PageHeader;
