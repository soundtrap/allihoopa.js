export { setup } from './config';
export { authenticate } from './auth';
export {
  uploadResource as upload,
  dropPiece as dropUpload
} from './drop/DropAPI';
export { DropPiece } from './drop/PieceData';
