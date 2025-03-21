"""empty message

Revision ID: ae747129ad62
Revises: 6ce66f6e8c42
Create Date: 2023-12-31 23:22:33.500370

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'ae747129ad62'
down_revision = '6ce66f6e8c42'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tweet', schema=None) as batch_op:
        batch_op.alter_column('likes',
               existing_type=postgresql.ARRAY(sa.INTEGER()),
               type_=sa.ARRAY(sa.String()),
               existing_nullable=False)
        batch_op.alter_column('retweets',
               existing_type=postgresql.ARRAY(sa.INTEGER()),
               type_=sa.ARRAY(sa.String()),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tweet', schema=None) as batch_op:
        batch_op.alter_column('retweets',
               existing_type=sa.ARRAY(sa.String()),
               type_=postgresql.ARRAY(sa.INTEGER()),
               existing_nullable=False)
        batch_op.alter_column('likes',
               existing_type=sa.ARRAY(sa.String()),
               type_=postgresql.ARRAY(sa.INTEGER()),
               existing_nullable=False)

    # ### end Alembic commands ###
