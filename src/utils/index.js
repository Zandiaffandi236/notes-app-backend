/* eslint-disable camelcase */
const mapDBToModel = ({
  id,
  title,
  body,
  tags,
  created_at,
  updated_at,
}) => {
  const result = {
    id,
    title,
    body,
    tags,
    createdAt: created_at,
    updatedAt: updated_at,
  };

  return result;
};

module.exports = { mapDBToModel };