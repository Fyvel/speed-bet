export const STATUS = {
  upcoming: 'Upcoming',
  ongoing: 'Ongoing',
  ended: 'Ended',
  convert(enumValue: number) {
    switch (enumValue) {
      case 0:
        return STATUS.upcoming;
      case 1:
        return STATUS.ongoing;
      case 2:
        return STATUS.ended;
      default:
        break;
    }
  }
};
