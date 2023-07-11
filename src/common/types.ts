export interface IClaim {
  _id: string;
  article: {
    _id: string;
  };
  text: string;
  lang: string;
  createdAt: string;
  nPositiveVotes: number,
  nNegativeVotes: number,
  nReviews: number,
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

export interface IArticle {
  _id: string,
  createdAt: string;
  title: string;
  sourceUrl: string;
  lang: string;
  text: string;
  sourceType: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  isSavedByUser: boolean,
}

export interface IReview {
  _id: string,
  claimId: {
    _id: string
  },
  text: string,
  createdAt: string,
  vote: string,
  links: string[],
  nPositiveVotes: number,
  nNeutralVotes: number,
  nNegativeVotes: number,
  author: {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    level: number,
  },
}

export interface IUserReview {
  claim: IClaim;
  _id: string,
  claimId: {
    _id: string
  },
  text: string,
  createdAt: string,
  vote: string,
  links: string[],
  nPositiveVotes: number,
  nNeutralVotes: number,
  nNegativeVotes: number,
  author: IAuthor,
  article: string,
}

export interface IStats {
  user: {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    level: number,
  },
  articles: {
    total: number;
    nSaved: number;
  };
  claims: {
    nPositiveVotes: number;
    nNegativeVotes: number;
  };
  reviews: {
    nPositiveVotes: number;
    nNegativeVotes: number;
    nNeutralVotes: number;
  };

}

export interface IPerson {
  name: string;
  nArticles: number;
  nClaims: number;
  nReviews: number;
}

export interface IAuthor {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  reputation: number
}

export interface IProfile {
  id: string,
  name: string,
  email: string,
  role: string,
  createdAt: string,
  firstName: string,
  lastName: string,
  nReviews: number,
  nBeenVoted: number,
  savedArticles: string[],
  level: number
}

export interface IRegister {
  firstName: string;
  lastName: number;
  email: number;
  password: number;
}

export interface IEditProfile {
  firstName: string;
  lastName: number;
  email: number;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_BASE: string;
      REACT_APP_API_GET_TEXT: string;
      PORT?: string;
    }
  }
}
