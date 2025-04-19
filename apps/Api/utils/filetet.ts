import axios from 'axios';

export const getTextFile = async (url: string, path: string): Promise<string> => {
  try {
    const base = new URL(url).origin;
    const { data } = await axios.get(`${base}/${path}`);
    return data;
  } catch {
    return `${path} not found`;
  }
};
