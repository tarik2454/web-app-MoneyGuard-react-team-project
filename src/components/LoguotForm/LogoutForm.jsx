import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from 'redux/Global/globalSlice';
import {
  StyledButtonCancel,
  StyledButtonLogout,
  StyledDivSpriteSvgLogout,
  StyledLogoutH2,
  StyledLogoutP,
  StyledSectionLogout,
} from './LogoutForm.styled';
import { logoutThunk } from 'redux/Auth/operations';
import { toast } from 'react-toastify';
import { getIsLoading, getUser } from 'redux/Auth/selectors';
import { useNavigate } from 'react-router-dom';
import { SpriteSVG } from 'pictures/SpriteSVG';

export const LogoutForm = () => {
  const dispatch = useDispatch();
  const { username } = useSelector(getUser);
  const navigate = useNavigate();

  const isLoading = useSelector(getIsLoading);

  const handleLogout = () => {
    dispatch(logoutThunk())
      .unwrap()
      .then(() => {
        toast.success(`Goobye ${username || ''}!`);
        dispatch(closeModal());
        navigate('/login');
      });
  };

  return (
    <StyledSectionLogout>
      <StyledDivSpriteSvgLogout>
        <SpriteSVG name="logo" />
      </StyledDivSpriteSvgLogout>
      <StyledLogoutH2>Money Guard</StyledLogoutH2>
      <StyledLogoutP>Are you sure you want to log out?</StyledLogoutP>
      <StyledButtonLogout onClick={handleLogout} disabled={isLoading}>
        Logout
      </StyledButtonLogout>
      <StyledButtonCancel onClick={e => dispatch(closeModal())}>
        Cancel
      </StyledButtonCancel>
    </StyledSectionLogout>
  );
};
