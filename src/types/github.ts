export interface SearchUserItem {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
  site_admin: boolean;
  score?: number;
}

export interface SearchUserResponse {
  total_count: number;
  incomplete_results: boolean;
  items: SearchUserItem[];
}

export interface UserInfoResponse {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
}
