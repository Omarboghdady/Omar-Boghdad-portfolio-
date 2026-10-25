export const MAX_IMAGE_SIZE = 8 * 1024 * 1024;
export const IMAGE_ACCEPT = "image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp";

export type Project = {
  id: number;
  image: Blob;
  imageName: string;
  title: string;
  description: string;
  technologies: string;
  githubUrl: string;
  demoUrl: string;
  published: boolean;
};

export type Certificate = {
  id: number;
  image: Blob;
  imageName: string;
  title: string;
  issuer: string;
  issueDate: string;
  certificateId: string;
  verificationUrl: string;
};

type StoreName = "projects" | "certificates";

let databasePromise: Promise<IDBDatabase> | undefined;

function openDatabase(): Promise<IDBDatabase> {
  if (!("indexedDB" in window)) {
    return Promise.reject(new Error("This browser does not support persistent image storage."));
  }

  if (!databasePromise) {
    databasePromise = new Promise((resolve, reject) => {
      const request = window.indexedDB.open("omar-portfolio", 1);

      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains("projects")) {
          database.createObjectStore("projects", { keyPath: "id" });
        }
        if (!database.objectStoreNames.contains("certificates")) {
          database.createObjectStore("certificates", { keyPath: "id" });
        }
      };

      request.onsuccess = () => {
        const database = request.result;
        database.onversionchange = () => database.close();
        resolve(database);
      };
      request.onerror = () => {
        databasePromise = undefined;
        reject(request.error ?? new Error("Could not open portfolio storage."));
      };
      request.onblocked = () => {
        databasePromise = undefined;
        reject(new Error("Portfolio storage is blocked by another open page. Close other portfolio tabs and try again."));
      };
    });
  }

  return databasePromise;
}

function transact<T>(
  storeName: StoreName,
  mode: IDBTransactionMode,
  action: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  return openDatabase().then((database) => new Promise<T>((resolve, reject) => {
    const transaction = database.transaction(storeName, mode);
    const request = action(transaction.objectStore(storeName));
    let result: T;

    request.onsuccess = () => {
      result = request.result;
    };
    request.onerror = () => {
      reject(request.error ?? new Error("Could not access portfolio storage."));
    };
    transaction.oncomplete = () => resolve(result);
    transaction.onerror = () => {
      reject(transaction.error ?? new Error("Could not save portfolio data."));
    };
    transaction.onabort = () => {
      reject(transaction.error ?? new Error("Portfolio storage operation was cancelled."));
    };
  }));
}

export const getProjects = () =>
  transact<Project[]>("projects", "readonly", (store) => store.getAll());

export const saveProject = (project: Project) =>
  transact<IDBValidKey>("projects", "readwrite", (store) => store.put(project));

export const deleteProject = (id: number) =>
  transact<undefined>("projects", "readwrite", (store) => store.delete(id));

export const getCertificates = () =>
  transact<Certificate[]>("certificates", "readonly", (store) => store.getAll());

export const saveCertificate = (certificate: Certificate) =>
  transact<IDBValidKey>("certificates", "readwrite", (store) => store.put(certificate));

export const deleteCertificate = (id: number) =>
  transact<undefined>("certificates", "readwrite", (store) => store.delete(id));

export function validateImage(file: File): string | undefined {
  const validTypes = ["image/png", "image/jpeg", "image/webp"];
  const validType = validTypes.includes(file.type);
  const validExtension = /\.(png|jpe?g|webp)$/i.test(file.name);

  if (file.type ? !validType : !validExtension) {
    return "Choose a PNG, JPG, JPEG, or WEBP image.";
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return "Choose an image smaller than 8 MB.";
  }
  if (file.size === 0) {
    return "The selected image is empty. Choose another file.";
  }
  return undefined;
}
