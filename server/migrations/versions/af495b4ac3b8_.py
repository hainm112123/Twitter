"""empty message

Revision ID: af495b4ac3b8
Revises: 357eda03eb7f
Create Date: 2024-01-31 15:53:45.082461

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'af495b4ac3b8'
down_revision = '357eda03eb7f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tweet', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_reply_of', sa.Integer(), nullable=True))
        batch_op.drop_column('is_reply')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tweet', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_reply', sa.BOOLEAN(), autoincrement=False, nullable=True))
        batch_op.drop_column('is_reply_of')

    # ### end Alembic commands ###
