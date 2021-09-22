import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

const ExportToolbar = () => {
  return (
    <GridToolbarContainer style={{ display: 'flex', justifyContent: 'end' }}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

export default ExportToolbar;
