"""empty message

Revision ID: 357eda03eb7f
Revises: 05d79a614af4
Create Date: 2024-01-31 10:01:01.426343

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '357eda03eb7f'
down_revision = '05d79a614af4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tweet', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_reply', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tweet', schema=None) as batch_op:
        batch_op.drop_column('is_reply')

    # ### end Alembic commands ###
