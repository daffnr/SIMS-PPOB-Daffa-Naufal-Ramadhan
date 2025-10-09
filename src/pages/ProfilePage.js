import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getProfile, updateProfile, updateProfileImage } from '../services/api';
import { logout } from '../features/auth/authSlice';
import Logo from '../components/atoms/Logo/Logo';
import defaultProfileImage from '../assets/images/profilePhoto.png';

const ProfileContainer = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;

  @media (max-width: 768px) {
    margin-bottom: 20px;
    padding: 12px 16px;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  @media (max-width: 480px) {
    margin-bottom: 16px;
    padding: 10px 12px;
    gap: 8px;
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 16px;
    width: 100%;
    justify-content: space-between;
  }

  @media (max-width: 480px) {
    gap: 12px;
    flex-wrap: wrap;
  }
`;

const NavLink = styled.a`
  color: #1f2937;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }

  &.active {
    color: #dc2626;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 350px;
  }

  @media (max-width: 480px) {
    max-width: 300px;
  }
`;

const ProfileImageContainer = styled.div`
  position: relative;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    margin-bottom: 16px;
  }
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
  border: 3px solid #f3f4f6;
`;


const EditIcon = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  background-color: #6b7280;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 14px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const UserName = styled.h2`
  color: #1f2937;
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 32px 0;
  text-align: center;
`;

const FormContainer = styled.div`
  width: 100%;
  margin-bottom: 32px;
`;

const FormField = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  color: #1f2937;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const InputContainer = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-size: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  color: #1f2937;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #dc2626;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const EditButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #b91c1c;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: white;
  color: #dc2626;
  border: 1px solid #dc2626;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #fef2f2;
  }
`;

const LoadingText = styled.div`
  text-align: center;
  color: #6b7280;
  font-size: 16px;
  margin: 40px 0;
`;

const ErrorText = styled.div`
  text-align: center;
  color: #dc2626;
  font-size: 14px;
  margin: 16px 0;
`;

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector(state => state.auth);
  const token = user?.token || localStorage.getItem('token');

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: ''
  });

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProfile(token);
      setProfile(response.data);
      setFormData({
        email: response.data.email || '',
        first_name: response.data.first_name || '',
        last_name: response.data.last_name || ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!isLoggedIn || !token) {
      navigate('/login');
      return;
    }

    fetchProfile();
  }, [isLoggedIn, token, navigate, fetchProfile]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validasi ukuran file (maksimal 100KB)
    if (file.size > 100 * 1024) {
      setError('Ukuran file maksimal 100KB');
      return;
    }

    // Validasi tipe file
    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar');
      return;
    }

    try {
      setError(null);
      const response = await updateProfileImage(token, file);
      setProfile(prev => ({
        ...prev,
        profile_image: response.data.profile_image
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      setError(null);
      await updateProfile(token, formData);
      await fetchProfile(); // Refresh profile data
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      email: profile.email || '',
      first_name: profile.first_name || '',
      last_name: profile.last_name || ''
    });
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <ProfileContainer>
        <LoadingText>Memuat profil...</LoadingText>
      </ProfileContainer>
    );
  }

  if (!profile) {
    return (
      <ProfileContainer>
        <ErrorText>Gagal memuat profil</ErrorText>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <Header>
        <Logo />
        <Navigation>
          <NavLink onClick={() => navigate('/topup')}>Top Up</NavLink>
          <NavLink onClick={() => navigate('/transaction')}>Transaction</NavLink>
          <NavLink href="#profile" className="active">Akun</NavLink>
        </Navigation>
      </Header>

      <ProfileSection>
        <ProfileImageContainer>
          <ProfileImage
            src={profile.profile_image && profile.profile_image.trim() !== '' ? profile.profile_image : defaultProfileImage}
            alt="Profile"
            onError={(e) => {
              e.target.src = defaultProfileImage;
            }}
          />
          <EditIcon onClick={() => document.getElementById('profile-image-input').click()}>
            ✏️
          </EditIcon>
          <HiddenFileInput
            id="profile-image-input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </ProfileImageContainer>

        <UserName>{profile.first_name} {profile.last_name}</UserName>

        <FormContainer>
          <FormField>
            <Label>Email</Label>
            <InputContainer>
              <InputIcon>@</InputIcon>
              <Input
                type="email"
                name="email"
                value={isEditing ? formData.email : profile.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </InputContainer>
          </FormField>

          <FormField>
            <Label>Nama Depan</Label>
            <InputContainer>
              <InputIcon>👤</InputIcon>
              <Input
                type="text"
                name="first_name"
                value={isEditing ? formData.first_name : profile.first_name}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </InputContainer>
          </FormField>

          <FormField>
            <Label>Nama Belakang</Label>
            <InputContainer>
              <InputIcon>👤</InputIcon>
              <Input
                type="text"
                name="last_name"
                value={isEditing ? formData.last_name : profile.last_name}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </InputContainer>
          </FormField>
        </FormContainer>

        {error && <ErrorText>{error}</ErrorText>}

        <ButtonContainer>
          {isEditing ? (
            <>
              <EditButton onClick={handleSaveProfile}>
                Simpan
              </EditButton>
              <LogoutButton onClick={handleCancelEdit}>
                Batal
              </LogoutButton>
            </>
          ) : (
            <>
              <EditButton onClick={handleEditProfile}>
                Edit Profil
              </EditButton>
              <LogoutButton onClick={handleLogout}>
                Logout
              </LogoutButton>
            </>
          )}
        </ButtonContainer>
      </ProfileSection>
    </ProfileContainer>
  );
};

export default ProfilePage;
