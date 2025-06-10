import React from "react";

const VideoSection: React.FC = () => (
  <section style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
    <video
      src="https://d1735p3aqhycef.cloudfront.net/official-website/public/tools/main_page.mp4"
      controls
      autoPlay
      muted
      loop
      style={{ width: '100%', maxWidth: '1200px', maxHeight: '600px', borderRadius: '12px' }}
    />
  </section>
);

export default VideoSection; 