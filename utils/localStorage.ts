export interface UserProfile {
  name: string;
  email: string;
  role: 'designer' | 'developer' | 'both';
  skills: string[];
  portfolio?: string;
  biography: string;
  createdAt: string;
}

const USER_PROFILE_KEY = 'desyndev_user_profile';

export const saveUserProfile = (profile: UserProfile) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
    }
  } catch (error) {
    console.error('Error saving user profile:', error);
  }
};

export const getUserProfile = (): UserProfile | null => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = window.localStorage.getItem(USER_PROFILE_KEY);
      return data ? JSON.parse(data) : null;
    }
  } catch (error) {
    console.error('Error retrieving user profile:', error);
  }
  return null;
};

export const clearUserProfile = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(USER_PROFILE_KEY);
    }
  } catch (error) {
    console.error('Error clearing user profile:', error);
  }
};
