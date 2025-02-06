export const saveRoom = (roomData: any) => {
  const existingRooms = JSON.parse(localStorage.getItem('testRooms') || '[]');
  localStorage.setItem('testRooms', JSON.stringify([...existingRooms, roomData]));
};

export const getRooms = () => {
  return JSON.parse(localStorage.getItem('testRooms') || '[]');
};

export const getRoom = (roomId: string) => {
  const rooms = getRooms();
  return rooms.find((room: any) => room.id === roomId);
};

export const saveParticipant = (roomId: string, participantData: any) => {
  localStorage.setItem(`participant_${roomId}`, JSON.stringify(participantData));
};

export const getParticipant = (roomId: string) => {
  return JSON.parse(localStorage.getItem(`participant_${roomId}`) || 'null');
};