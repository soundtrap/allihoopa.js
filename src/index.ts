export { setup } from './config';
export { authenticate } from './auth';
export { drop } from './drop';
export {
  uploadResource as upload,
  dropPiece as dropUpload
} from './drop/DropAPI';
export { DropPiece } from './drop/PieceData';
