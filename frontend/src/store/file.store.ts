/**
 * Stores and loads filesd
 *
 * @module Store.File
 */

import {defineStore} from "pinia";

export const fileStore = defineStore('files', {
    state: () => ({
      selectedFiles: [] as File[],
    }),
    actions: {
      updateFiles(files: File[]) {
        this.selectedFiles = files;
      },
    },
    getters: {
      getSelectedFiles(): File[] {
        return this.selectedFiles;
      },
    },
  });