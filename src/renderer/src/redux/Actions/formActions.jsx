export const updateCoachName = (coachForm) => ({
  type: 'UPDATE_COACH_NAME',
  payload: coachForm,
});
export const updateStuForm = (stuForm) => ({
  type: 'UPDATE_STU_FORM',
  payload: stuForm,
});

export const updateClassForm = (page , data) => ({
  type: 'UPDATE_CLASS_FORM',
  payload:{page,data},
});

export const updateReserveTime = (reserveForm) => ({
  type: 'UPDATE_RESERVE_TIME',
  payload:{reserveForm},
});