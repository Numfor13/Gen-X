from app import domain


def test_wilson_is_conservative():
    assert domain.wilson_lb(0, 0) is None
    assert domain.wilson_lb(1, 0) < domain.wilson_lb(20, 0) < 1  # a thin perfect record scores lower
    assert domain.wilson_lb(18, 2) < 0.9
    assert domain.wilson_lb(0, 5) < 0.01


def test_tier_ladder():
    assert domain.tier(1, 1, 50, 0.99) == 0  # jobs cannot replace vouches
    assert domain.tier(2, 1, 50, 0.99) == 0  # two vouches from the same circle do not count
    assert domain.tier(2, 2, 0, None) == 1
    assert domain.tier(2, 2, 3, 0.5) == 2
    assert domain.tier(2, 2, 10, 0.79) == 2
    assert domain.tier(2, 2, 10, 0.8) == 3


def test_next_step():
    assert domain.next_step(0, 0, 0, None) == {"kind": "vouches", "n": 2}
    assert domain.next_step(2, 1, 0, None) == {"kind": "circle", "n": 1}
    assert domain.next_step(2, 2, 1, None) == {"kind": "jobs", "n": 2}
    assert domain.next_step(2, 2, 12, 0.5) == {"kind": "score", "n": 80}
    assert domain.next_step(2, 2, 12, 0.9) is None


def test_match_score_prefers_near_and_trusted():
    assert domain.match_score(0.5, 0.9, 3) > domain.match_score(6, 0.9, 3)
    assert domain.match_score(1, 0.9, 2) > domain.match_score(1, 0.6, 2)
    assert domain.km((4.158, 9.290), (4.158, 9.290)) == 0


def test_double_blind_reveal():
    job = {"completed_at": 1000, "reviews": {"customer": {}}}
    assert not domain.revealed(job, 1000 + 3600)
    assert domain.revealed(job, 1000 + domain.REVEAL_AFTER_S)
    assert domain.revealed({"completed_at": 1000, "reviews": {"customer": {}, "artisan": {}}}, 1001)
