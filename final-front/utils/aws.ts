import AWS from 'aws-sdk';

const ACCESS_KEY = process.env.NEXT_PUBLIC_S3_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY;
const REGION = process.env.NEXT_PUBLIC_S3_REGION;
const BUCKET = process.env.NEXT_PUBLIC_S3_BUCKET;

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});

// 버킷에 맞는 이름과 리전을 설정합니다.
const myBucket = new AWS.S3({
  params: { Bucket: BUCKET },
  region: REGION,
});

export async function uploadFile(file: File, id: string) {
  if (!BUCKET) {
    return false;
  }
  const params = {
    ACL: 'public-read',
    Body: file,
    Bucket: BUCKET,
    Key: `kdt-final/${id}`,
  };
  const res = await myBucket.putObject(params).promise();
  if (res.$response.error) {
    return false;
  }
  return true;
}

export async function deleteFile(filename: string) {
  if (!BUCKET) {
    return false;
  }
  const params = { Key: `kdt-final/${filename}`, Bucket: BUCKET };
  const res = await myBucket.deleteObject(params).promise();
  if (res.$response.error) {
    return false;
  }
  return true;
}
