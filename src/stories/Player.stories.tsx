import React from 'react'
import { ComponentMeta, Story } from '@storybook/react'

import { Player, PlayerProps } from '../'

const tracks = [
  {
    duration: 326,
    url: '/a_71/disque_1/tracks/01_Izdiucz.mp3',
    title: 'Izdiucz',
  },
  {
    duration: 298,
    url: '/a_71/disque_1/tracks/02_Hig.mp3',
    title: 'Hig',
  },
  {
    duration: 244,
    url: '/a_71/disque_1/tracks/03_MehrabanBash.mp3',
    title: 'Mehraban Bash',
  },
  {
    duration: 386,
    url: '/a_71/disque_1/tracks/04_Nebah.mp3',
    title: 'Nebah',
  },
  {
    duration: 295,
    url: '/a_71/disque_1/tracks/05_Oudische.mp3',
    title: 'Oudische',
  },
  {
    duration: 250,
    url: '/a_71/disque_1/tracks/06_IzdiuczRadioEdit.mp3',
    title: 'IzdiuczRadioEdit',
  },
  {
    duration: 205,
    url: '/a_71/disque_1/tracks/07_Ayn.mp3',
    title: 'Ayn',
  },
  {
    duration: 288,
    url: '/a_71/disque_1/tracks/08_Volkische.mp3',
    title: 'Izdiucz',
  },
  {
    duration: 305,
    url: '/a_71/disque_1/tracks/09_HijazOnD.mp3',
    title: 'HijazOnD',
  },
]

export default {
  title: 'Player',
  component: Player,
  argTypes: {
    backgroundColor: {
      control: { type: 'text' },
    },
    cover: {
      control: { type: 'text' },
    },
    fillColor: {
      control: { type: 'text' },
    },
    side: {
      control: { type: 'number' },
    },
    textColor: {
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof Player>

const Template: Story<PlayerProps> = (args): any => {
  return (
    <div style={{ width: '400px', marginLeft: '200px' }}>
      <Player {...args} />
    </div>
  )
}

const WithCover = Template.bind({})

WithCover.args = {
  cover: '/a_71/cover/cover_71.jpg',
  tracks,
}

export { WithCover }
