

const config = {
  screens: {
    // NotFound: '*',
    EventDetail: {
      path: 'detail/:id',
    },
  },
};

const linking: any = {
  prefixes: ['eventhub://app'],
  config,
};

export default linking;