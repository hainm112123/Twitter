"""empty message

Revision ID: 291f701986f6
Revises: f70e50524d16
Create Date: 2024-02-15 12:40:20.719316

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '291f701986f6'
down_revision = 'f70e50524d16'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.alter_column('is_repost_of',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.alter_column('is_repost_of',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###
