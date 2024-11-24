export const GroupUserId = 10060; // Group User Id
export const customRound = (number) => {
  const floorNumber = Math.floor(number);
  const decimalPart = number - floorNumber;

  if (decimalPart < 0.5) {
    return floorNumber;
  } else {
    return floorNumber + 1;
  }
};
