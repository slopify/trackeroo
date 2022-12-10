import React from 'react';
import { Page, Layout, MediaCard, VideoThumbnail } from '@shopify/polaris';
import { TitleBar } from "@shopify/app-bridge-react";
import Heading from '../components/Plans/Heading';

const Tutorials: React.FC = () => {
    return (
        <Page narrowWidth>
            <Layout>
                <Layout.Section>
                    <Heading element="h1" color="#121212">
                        Tutorials
                    </Heading>
                </Layout.Section>
                <Layout.Section>
                <MediaCard
                    size="small"
                    title="How do I add Trackeroo to my store?"
                    primaryAction={{
                        content: 'Watch Video',
                        onAction: () => {
                            window.open('https://www.loom.com/share/0d876c74dd664690923b352da35ad98a', '_blank').focus();
                        },
                    }}
                    description={
                        'Watch this video to learn how to add a "Track your order" page to your store and provide your customers with a great experience!'
                    }
                    popoverActions={[]}
                >
                    <VideoThumbnail
                        onClick={() => {
                            window.open('https://www.loom.com/share/0d876c74dd664690923b352da35ad98a', '_blank').focus();
                        }}
                        videoLength={122}
                        thumbnailUrl="https://firebasestorage.googleapis.com/v0/b/dhruv-41f3f.appspot.com/o/v_thumbnail.png?alt=media&token=a46f4243-605b-4e92-8087-6937531dc377"
                    />
                </MediaCard>

                <MediaCard
                    size="small"
                    title="How can I customize Trackeroo to match my brand?"
                    primaryAction={{
                        content: 'Watch Video',
                        onAction: () => {
                            window.open('https://www.loom.com/share/94e29d034b8548169a41d490c1337dd3', '_blank').focus();
                        },
                    }}
                    description={
                        "Watch this video to learn how to match Trackeroo to your store's theme and brand with ease making everything unified on your store!"
                    }
                    popoverActions={[]}
                >
                    <VideoThumbnail
                        onClick={() => {
                            window.open('https://www.loom.com/share/94e29d034b8548169a41d490c1337dd3', '_blank').focus();
                        }}
                        videoLength={235}
                        thumbnailUrl="https://firebasestorage.googleapis.com/v0/b/dhruv-41f3f.appspot.com/o/v_thumbnail.png?alt=media&token=a46f4243-605b-4e92-8087-6937531dc377"
                    />
                </MediaCard>
                </Layout.Section>
            </Layout>
        </Page>
    );
};

export default Tutorials;
