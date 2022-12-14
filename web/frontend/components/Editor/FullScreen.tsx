import {
    Badge,
    ButtonGroup,
    FullscreenBar,
    Button,
  } from '@shopify/polaris';
  import {useState, useCallback} from 'react';
  
  const  FullscreenEditor = () => {
    const [isFullscreen, setFullscreen] = useState(false);
  
    const handleActionClick = useCallback(() => {
      setFullscreen(false);
    }, []);


    const fullScreen = (
        <div
        style={{
            display: 'flex',
            backgroundColor: 'blue',
            flexGrow: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            height: '100vh'
          }}></div>
    );
  
    const fullscreenBarMarkup = (<>
      <FullscreenBar onAction={handleActionClick}>
        <div
          style={{
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: '1rem',
            paddingRight: '1rem',
          }}
        >
          <Badge status="info">Draft</Badge>
          <div style={{marginLeft: '1rem', flexGrow: 1}}>
              Tracking Page Editor
          </div>
          <ButtonGroup>
            <Button primary onClick={() => {}}>
              Save Changes
            </Button>
          </ButtonGroup>
        </div>
      </FullscreenBar>
      {fullScreen}
      </>
    );

  
    return (
      <div style={{width: '100%'}}>
        {isFullscreen && fullscreenBarMarkup}
        <div style={{padding: '1rem'}}>
          {!isFullscreen && (
            <Button primary onClick={() => setFullscreen(true)}>Open Editor</Button>
          )}
        </div>
      </div>
    );
  }

  export default FullscreenEditor;