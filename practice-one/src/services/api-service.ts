import { axiosClient } from './http-client';

const ApiService = {
  /**
   * Get list of data
   * @param url
   */
  async getList<T>(url: string): Promise<T[]> {
    return axiosClient.get(url);
  },

  /**
   * Get item data by id
   * @param url
   */
  async getItemById<T>(url: string): Promise<T> {
    return axiosClient.get(url);
  },

  /**
   * Create item
   * @param url
   * @param data
   */
  async create<T>(url: string, data: Omit<T, 'id'>): Promise<T> {
    return axiosClient.post(url, data);
  },

  /**
   * Update data
   * @param url
   * @param data
   */
  async update<T>(url: string, data: Partial<T>): Promise<T> {
    return axiosClient.patch(url, data);
  },

  /**
   * Delete data
   * @param url
   */
  async delete<T>(url: string): Promise<T> {
    return axiosClient.delete(url);
  },
};

export { ApiService };
