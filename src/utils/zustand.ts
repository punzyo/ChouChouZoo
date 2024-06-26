import { create } from 'zustand';
import type { TrackReferenceOrPlaceholder } from '@livekit/components-react';
import type { PullRequest } from '@/types';
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  setUser: (userData: User) => void;
  resetUser: () => void;
}

export const useUserState = create<UserState>((set) => ({
  user: JSON.parse(localStorage.getItem('CaterTownUser') || 'null'),
  setUser: (userData) => {
    localStorage.setItem('CaterTownUser', JSON.stringify(userData));
    set({ user: userData });
  },
  resetUser: () => {
    localStorage.removeItem('CaterTownUser');
    set({ user: null });
  },
}));

interface PullRequestState {
  showPullRequests: boolean;
  prGitHubId: string;
  pullRequests: PullRequest[];
  setPrGitHubId: (prGitHubId: string) => void;
  setPullRequests: (pullRequests: PullRequest[]) => void;
  setShowPullRequests: (showPullRequests: boolean) => void;
  toggleShowPullRequests: (gitHubId: string) => void;
}
export const usePullRequests = create<PullRequestState>((set, get) => ({
  showPullRequests: false,
  prGitHubId: '',
  pullRequests: [],

  setPrGitHubId: (prGitHubId) => set({ prGitHubId }),
  setPullRequests: (pullRequests) => {
    set({ pullRequests });
  },
  setShowPullRequests: (showPullRequests) => set({ showPullRequests }),
  toggleShowPullRequests: (gitHubId) => {
    if (gitHubId === get().prGitHubId) {
      set((state) => ({ showPullRequests: !state.showPullRequests }));
    } else {
      set({
        prGitHubId: gitHubId,
        showPullRequests: true,
      });
    }
  },
}));
interface PlayerTracksState {
  allTracks: TrackReferenceOrPlaceholder[];
  setTracks: (allTracks: TrackReferenceOrPlaceholder[]) => void;
}

export const usePlayerTracks = create<PlayerTracksState>((set) => ({
  allTracks: [],
  setTracks: (allTracks) => set({ allTracks }),
}));
interface GameSettingsState {
  showSidebar: boolean;
  isFullScreen: boolean;
  resetPosition: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
  setIsFullScreen: (isFullScreen: boolean) => void;
  setResetPosition: (resetPosition: boolean) => void;
}

export const useGameSettings = create<GameSettingsState>((set) => ({
  showSidebar: true,
  isFullScreen: false,
  resetPosition: false,
  setShowSidebar: (showSidebar) => set({ showSidebar }),
  setIsFullScreen: (isFullScreen) => set({ isFullScreen }),
  setResetPosition: (resetPosition) => set({ resetPosition }),
}));
