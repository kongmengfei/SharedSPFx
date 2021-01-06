import * as React from 'react';
import styles from './Carouseltest.module.scss';
import { ICarouseltestProps } from './ICarouseltestProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ICarouseltestState } from './ICarouseltestState';
import { Carousel, Image, Provider, teamsTheme } from '@fluentui/react-northstar';

export default class Carouseltest extends React.Component<ICarouseltestProps, ICarouseltestState> {

  constructor(props: ICarouseltestProps, state: ICarouseltestState) {
    super(props);
  }

  public render(): React.ReactElement<ICarouseltestProps> {


    const imageAltTags = {
      ade: 'Portrait of Ade',
      elliot: 'Portrait of Elliot',
      molly: 'Portrait of Molly',
      nan: 'Portrait of Nan',
    };

    const carouselItems = [
      {
        key: 'ade',
        id: 'ade',
        content: <Image src="https://fluentsite.z22.web.core.windows.net/public/images/avatar/large/ade.jpg" fluid alt={'Portrait of Ade'} />,
        thumbnail: <Image src="https://fluentsite.z22.web.core.windows.net/public/images/avatar/small/ade.jpg" fluid alt={imageAltTags.ade} />,
        'aria-label': imageAltTags.ade
      },
      {
        key: 'elliot',
        id: 'elliot',
        content: <Image src="https://fluentsite.z22.web.core.windows.net/public/images/avatar/large/elliot.jpg" fluid alt={imageAltTags.elliot} />,
        thumbnail: <Image src="https://fluentsite.z22.web.core.windows.net/public/images/avatar/small/elliot.jpg" fluid alt={imageAltTags.elliot} />,
        'aria-label': imageAltTags.elliot,
      },
      {
        key: 'molly',
        id: 'molly',
        content: <Image src="https://fluentsite.z22.web.core.windows.net/public/images/avatar/large/molly.png" fluid alt={imageAltTags.molly} />,
        thumbnail: <Image src="https://fluentsite.z22.web.core.windows.net/public/images/avatar/small/molly.png" fluid alt={imageAltTags.molly} />,
        'aria-label': imageAltTags.molly,
      },
      {
        key: 'nan',
        id: 'nan',
        content: <Image src="https://fluentsite.z22.web.core.windows.net/public/images/avatar/large/nan.jpg" fluid alt={imageAltTags.nan} />,
        thumbnail: <Image src="https://fluentsite.z22.web.core.windows.net/public/images/avatar/small/nan.jpg" fluid alt={imageAltTags.nan} />,
        'aria-label': imageAltTags.nan,
      }
    ];
    return (
      <Provider theme={teamsTheme}>
        <Carousel
          ariaRoleDescription="carousel"
          ariaLabel="Portrait collection"
          thumbnails
          navigation={{
            'aria-label': 'people portraits',
            items: carouselItems.map((item, index) => ({
              key: index,
              'aria-controls': item.id,
              'aria-label': item['aria-label'],
              content: item.thumbnail,
            })),
          }}
          items={carouselItems}
          getItemPositionText={(index: number, size: number) => `${index + 1} of ${size}`}
        />
      </Provider>
    );
  }
}
