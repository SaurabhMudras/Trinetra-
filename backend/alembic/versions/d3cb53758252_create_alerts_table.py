"""create alerts table

Revision ID: d3cb53758252
Revises: af9fda7bcac7
Create Date: 2026-08-09 01:54:03.474007

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "d3cb53758252"
down_revision: Union[str, Sequence[str], None] = "af9fda7bcac7"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Create alerts table."""

    op.create_table(
        "alerts",

        sa.Column(
            "id",
            sa.UUID(),
            nullable=False
        ),

        sa.Column(
            "title",
            sa.String(),
            nullable=False
        ),

        sa.Column(
            "description",
            sa.Text(),
            nullable=True
        ),

        sa.Column(
            "severity",
            sa.String(),
            nullable=False
        ),

        sa.Column(
            "status",
            sa.String(),
            nullable=False
        ),

        sa.Column(
            "source",
            sa.String(),
            nullable=True
        ),

        sa.Column(
            "created_at",
            sa.DateTime(),
            nullable=False
        ),

        sa.Column(
            "updated_at",
            sa.DateTime(),
            nullable=False
        ),

        sa.PrimaryKeyConstraint("id")
    )


def downgrade() -> None:
    """Drop alerts table."""

    op.drop_table("alerts")